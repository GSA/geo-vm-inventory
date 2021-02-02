package main

const normalize = `UPDATE snow SET ram=REPLACE(ram, ",", "");
UPDATE snow SET disk_space=REPLACE(disk_space, ",", "");
UPDATE vcenter SET memory=REPLACE(memory, " MB", "");
UPDATE vcenter SET totalStorage=REPLACE(totalStorage, " MB", "");
UPDATE vcenter SET cpu=REPLACE(cpu, " vCPUs", "");
ALTER TABLE vcenter ADD COLUMN os;
UPDATE vcenter SET os=guestOS;
UPDATE vcenter SET os="FreeBSD" WHERE guestOS LIKE "FreeBSD%";
UPDATE vcenter SET os="Linux CentOS" WHERE guestOS="CentOS 4/5 or later (64-bit)";
UPDATE vcenter SET os="Linux CentOS" WHERE guestOS="CentOS 7 (64-bit)";
UPDATE vcenter SET os="Win7" WHERE guestOS="Microsoft Windows 7 (64-bit)";
UPDATE vcenter SET os="Win10" WHERE guestOS="Microsoft Windows 10 (64-bit)";
UPDATE vcenter SET os="Win2003" WHERE guestOS="Microsoft Windows Server 2003 (32-bit)";
UPDATE vcenter SET os="Win2003" WHERE guestOS="Microsoft Windows Server 2003 Standard (32-bit)";
UPDATE vcenter SET os="Win2003" WHERE guestOS="Microsoft Windows Server 2003 Standard (64-bit)";
UPDATE vcenter SET os="Win2008" WHERE guestOS="Microsoft Windows Server 2008 (32-bit)";
UPDATE vcenter SET os="Win2008R2" WHERE guestOS="Microsoft Windows Server 2008 R2 (64-bit)";
UPDATE vcenter SET os="Win2012" WHERE guestOS="Microsoft Windows Server 2012 (64-bit)";
UPDATE vcenter SET os="Win2016" WHERE guestOS="Microsoft Windows Server 2016 or later (64-bit)";
UPDATE vcenter SET os="Linux Oracle Enterprise Server" WHERE guestOS="Oracle Linux 4/5 or later (64-bit)";
UPDATE vcenter SET os="Linux Oracle Enterprise Server" WHERE guestOS="Oracle Linux 7 (64-bit)";
UPDATE vcenter SET os="Linux Oracle Enterprise Server" WHERE guestOS="Oracle Solaris 11 (64-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Server" WHERE guestOS="Red Hat Enterprise Linux 4 (32-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Server" WHERE guestOS="Red Hat Enterprise Linux 4 (64-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Server" WHERE guestOS="Red Hat Enterprise Linux 5 (32-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Server" WHERE guestOS="Red Hat Enterprise Linux 5 (64-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Server" WHERE guestOS="Red Hat Enterprise Linux 6 (64-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Server 7.9" WHERE guestOS="Red Hat Enterprise Linux 7 (64-bit)";
UPDATE vcenter SET os="Linux Red Hat Enterprise Linux 8.3" WHERE guestOS="Red Hat Enterprise Linux 8 (64-bit)";
UPDATE vcenter SET os="Linux SuSE" WHERE guestOS="SUSE Linux Enterprise 11 (32-bit)";
UPDATE vcenter SET os="Linux SuSE" WHERE guestOS="SUSE Linux Enterprise 11 (64-bit)";
UPDATE vcenter SET os="Linux SuSE" WHERE guestOS="SUSE Linux Enterprise 12 (64-bit)";
UPDATE vcenter SET os="Linux Ubuntu" WHERE guestOS="Ubuntu Linux (32-bit)";
UPDATE vcenter SET os="Linux Ubuntu" WHERE guestOS="Ubuntu Linux (64-bit)";
ALTER TABLE vcenter ADD COLUMN os_address_width;
UPDATE vcenter SET os_address_width="32" WHERE guestOS LIKE "%32-bit%";
UPDATE vcenter SET os_address_width="64" WHERE guestOS LIKE "%64-bit%";
`
