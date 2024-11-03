package com.JEEproject.Backend.Enums;

public enum TrackingStatus {
    ProcessingOrder,
    CollectingFromSender,
    InCollectingAgency,
    Shipping,
    InReceivingAgency,

    DeliveringToReceiver,

    Delivered,
    Aborted
}
