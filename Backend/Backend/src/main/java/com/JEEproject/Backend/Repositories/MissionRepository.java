package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Driver;
import com.JEEproject.Backend.Models.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Integer> {
    List<Mission> findByDriver(Driver driver);
}
