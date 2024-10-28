package com.JEEproject.Backend.Enums;

public enum TType {
    Recharge(1),
    Purchase(2);

    private final int value;

    TType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    // Static method to convert int to TType
    public static TType fromValue(int value) {
        for (TType type : TType.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
