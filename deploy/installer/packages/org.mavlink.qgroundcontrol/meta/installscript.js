function Component()
{

}

Component.prototype.createOperations = function()
{
    try {
        component.createOperations();
    } catch (e) {
        console.log(e);
    }

    if (systemInfo.productType === "windows") {
        component.addOperation("CreateShortcut", "@TargetDir@/bin/VimaanaGCS.exe", "@StartMenuDir@/VimaanaGCS.lnk");
        component.addOperation("CreateShortcut", "@TargetDir@/bin/VimaanaGCS.exe", "@DesktopDir@/VimaanaGCS.lnk");
    }
}
