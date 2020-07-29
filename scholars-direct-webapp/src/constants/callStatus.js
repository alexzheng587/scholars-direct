import Enum from "enum";

export const CallStatuses = new Enum([
    'Available',
    'Testing',
    'Calling',
    'CallFailed',
    'ReceivingCall',
    'AcceptingCall',
    'InCall',
    'HangingUp',
]);