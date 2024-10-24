package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Models.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AgencyRepository extends JpaRepository<Agency,Integer> {
    @Query("select a from Agency a where a.city=?1")
    Optional<Agency> findAgencyByCity(Cities city);

    @Query("select a from Agency a left join a.users u group by a order by count(u) DESC")
    List<Agency> sortAgenciesDesc();

    @Query("select a from Agency a left join a.users u group by a order by count(u) ASC")
    List<Agency> sortAgenciesAsc();

    Optional<Agency> findById(int id);
}
