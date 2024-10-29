package com.JEEproject.Backend.Enums;

public enum TrackingStatus {
    CollectingFromSender,
    InCollectingAgency,
    Shipping,
    InReceivingAgency,

    DeliveringToReceiver,

    Delivered,
    Aborted
}
