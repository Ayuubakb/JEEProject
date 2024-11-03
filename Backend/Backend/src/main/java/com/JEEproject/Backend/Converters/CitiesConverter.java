package com.JEEproject.Backend.Converters;

import com.JEEproject.Backend.Enums.Cities;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // This applies the converter to all Cities fields globally
public class CitiesConverter implements AttributeConverter<Cities, String> {

    @Override
    public String convertToDatabaseColumn(Cities city) {
        return city != null ? city.name() : null; // Convert Enum to String
    }

    @Override
    public Cities convertToEntityAttribute(String cityName) {
        return cityName != null ? Cities.valueOf(cityName) : null; // Convert String back to Enum
    }
}
