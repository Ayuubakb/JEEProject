package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Driver;
import com.JEEproject.Backend.Models.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Integer> {
    List<Mission> findByDriver(Driver driver);
<<<<<<< HEAD
=======
    // Additional query methods can be defined here if needed
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
}
