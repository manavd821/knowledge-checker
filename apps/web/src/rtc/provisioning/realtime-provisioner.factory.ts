import { LivekitProvisioner } from "@/rtc/provisioning/livekit-provisioner";
import { RealTimeProvisionerService } from "@/rtc/provisioning/realtime-provisioner.service";

export function get_livekit_provisioner(){
    return new LivekitProvisioner();
}

export function get_realtime_provisioner_service(){
    return new RealTimeProvisionerService(get_livekit_provisioner());
}