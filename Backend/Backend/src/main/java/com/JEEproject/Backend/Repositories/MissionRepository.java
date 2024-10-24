package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission,Integer> {
}
