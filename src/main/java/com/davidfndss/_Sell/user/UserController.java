package com.davidfndss._Sell.user;

import java.util.List;
import java.util.UUID;

import com.davidfndss._Sell.utils.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            String token = service.createUserService(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Usuário criado com sucesso. Token: " + token);
        } catch (BadRequestException ex) {
            System.out.println(ex.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body( "Bad request: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println(ex.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Internal server error.");
        }
    }

    @GetMapping
    public ResponseEntity<?> findAllUsers() {
        List<User> usersList = service.findAllUsersService();
        return ResponseEntity.status(HttpStatus.OK)
            .body(usersList);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable String id) {
        UUID idUUID = UUID.fromString(id);
        User user = service.findUserByIdService(idUUID);
        return ResponseEntity.status(HttpStatus.OK)
            .body(user);
    }


    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(UUID id, User updatedUser) {
        try {
            String token = service.updateUserService(id, updatedUser);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Usuário criado com sucesso. Token: " + token);
        } catch (BadRequestException ex) {
            System.out.println(ex.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body( "Bad request: " + ex.getMessage());
        } catch (Exception ex) {
            System.out.println(ex.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Internal server error.");
        }
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> deleteUserById(@PathVariable String id) {
        UUID idUUID = UUID.fromString(id);
        service.deleteUserByIdService(idUUID);
        return ResponseEntity.status(HttpStatus.OK)
            .body("Usuário deletado com sucesso!");
    }
}