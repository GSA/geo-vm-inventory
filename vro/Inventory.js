function sendEMail(list) {
    var date_time = new Date().toJSON().slice(0,19) + 'Z';
    // CSV attachment
    var csv = new MimeAttachment();
	csv.name = "virtualMachineEntities_" + date_time + ".csv";
    csv.content = getCsvLines(list);
    // JSON attachment
    var j = new MimeAttachment();
    j.name = "virtualMachineEntities_" + date_time + ".json";
 	j.content = JSON.stringify(list, null, 2);
    // EmailMessage
    var email = new EmailMessage();
    email.fromAddress = 'No-Reply-VRA-preProd@gsa.gov';
    email.fromName = "No Reply VRA preProd <No-Reply-VRA-prePROD@gsa.gov>";
    email.smtpHost = "159.142.1.100";
    email.smtpPort = 25;
    var cur_date = new Date().toJSON().slice(0,10);
    email.subject = "Report: vmWare Virtual Machine Entities (" + cur_date + ")";
    // Full Distro list:
    // email.toAddress = 'brian.fitzwater@gsa.gov,gregory.hodgins@gsa.gov,clifford.newton@gsa.gov,anita.pinto@gsa.gov,adanma.morrison@gsa.gov,cloudmgmt@gsa.gov,jaime.canales@gsa.gov,jason.donow@gsa.gov,teresa.halsell@gsa.gov,justin.noel@gsa.gov,lance.white@gsa.gov,mark.pratt@gsa.gov,Michael.gilbertson@gsa.gov,nathan.schweitzer@gsa.gov,stevel.johnson@gsa.gov,victor.pratt@gsa.gov';
    // System.log("Distro List: " + distroList);
    // email.toAddress = distroList;
    email.toAddress = "brian.fitzwater@gsa.gov";
    email.addMimePart(csv, "text/csv");
    email.addMimePart(j, "application/json")
    email.sendMessage();
}

function getCsvLines(input) {
    var CSV_SEPARATOR = ',';
    var headers = Object.keys(input[0]);
	var csv = headers.join(CSV_SEPARATOR);
    input.forEach(function (obj) {
		var line = [];
		headers.forEach(function (key) {
			if (key == "Notes") {
				line.push('"' + obj[key] + '"');
			} else {
				line.push(obj[key]);
			}
		});
		csv += "\n" + line.join(CSV_SEPARATOR);
	});
	return csv;
}

System.log("Start");
var vcacHost = Server.findAllForType("vCAC:VCACHost")[0];
var MODEL_MANAGEMENTMODELENTITIES = "ManagementModelEntities.svc";
var ENTITYSET_VIRTUALMACHINES = "VirtualMachines";
var virtualMachinesQueryProperties = new Properties();
var allVirtualMachineEntitiesList = vCACEntityManager.readModelEntitiesByCustomFilter(vcacHost.id, MODEL_MANAGEMENTMODELENTITIES, ENTITYSET_VIRTUALMACHINES, virtualMachinesQueryProperties, null);
var virtualMachineEntitiesList = [];
for each(var virtualMachine in allVirtualMachineEntitiesList) {
    if(virtualMachine.getProperty("IsManaged") === true) {
        // virtualMachineEntitiesList.push(virtualMachine.getProperty("VirtualMachineName"));
		var props = virtualMachine.getProperties();
		var ID = props["ExternalReferenceId"];
		System.log(ID);
		var vms = VcPlugin.getAllVirtualMachines(null, ID);
		if (vms.length == 0) {
			System.log("Could not find " + ID);
			props["IP"] = "undef";
		} else {
			props["IP"] = vms[0].guest.ipAddress;
		}
		//props["Notes"] = props["Notes"].replace(/,/g, ""); // Remove the comma that messes up the CSV
		virtualMachineEntitiesList.push(props);
		//System.log(virtualMachine.getProperty("VirtualMachineName") + "\n" + JSON.stringify(virtualMachine.getProperties(), null, 2)+ "\n");
    }
}

// System.log("List of Managed VMs " + virtualMachineEntitiesList.join(", "));
System.log("Record count: " + virtualMachineEntitiesList.length);
System.log("Sending eMail");
sendEMail(virtualMachineEntitiesList)
System.log("Done");