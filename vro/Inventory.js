var vcacHost = Server.findAllForType("vCAC:VCACHost")[0];
var MODEL_MANAGEMENTMODELENTITIES = "ManagementModelEntities.svc";
var ENTITYSET_VIRTUALMACHINES = "VirtualMachines";
var virtualMachinesQueryProperties = new Properties();
var allVirtualMachineEntitiesList = vCACEntityManager.readModelEntitiesByCustomFilter(vcacHost.id, MODEL_MANAGEMENTMODELENTITIES, ENTITYSET_VIRTUALMACHINES, virtualMachinesQueryProperties, null);
var virtualMachineEntitiesList = [];
for each(var virtualMachine in allVirtualMachineEntitiesList) {
    if(virtualMachine.getProperty("IsManaged") === true) {
        // virtualMachineEntitiesList.push(virtualMachine.getProperty("VirtualMachineName"));
		virtualMachineEntitiesList.push(virtualMachine.getProperties());
		//System.log(virtualMachine.getProperty("VirtualMachineName") + "\n" + JSON.stringify(virtualMachine.getProperties(), null, 2)+ "\n");
    }
}

// System.log("List of Managed VMs " + virtualMachineEntitiesList.join(", "));
System.log("Record count: " + virtualMachineEntitiesList.length);
System.log("\n" + JSON.stringify(virtualMachineEntitiesList, null, 2));
System.log("Record count: " + virtualMachineEntitiesList.length);