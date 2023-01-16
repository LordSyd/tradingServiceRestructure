package com.beschtee.backend.Repositories;

import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Models.person.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmailIgnoreCase(String email);

    Optional<User> findUserByFirstNameIgnoreCaseAndLastNameIgnoreCase(String firstname, String lastName);

    List<User> findAllByUserRoleEquals(UserRole userRole);

    Optional<User> findUserByIdAndUserRoleEquals(Long id, UserRole userRole);

    List<User> findUserByFirstNameIgnoreCaseAndLastNameIgnoreCaseAndUserRole(String firstname, String lastName, UserRole userRole);

    /*
    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value = "UPDATE users SET first_name = ?1 WHERE email = ?2"
    )
    int updateFirstNameByEmail(String firstName, String email);
    */

    /*
    @Modifying
    @Transactional
    @Query("UPDATE users u SET u.enabled = TRUE WHERE u.email = ?1")
    int enableUser(String email);
     */

}
