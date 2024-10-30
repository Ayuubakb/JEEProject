package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Integer> {
    // Additional query methods can be defined here if needed
}
