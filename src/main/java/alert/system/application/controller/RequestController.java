package alert.system.application.controller;

import alert.system.application.model.Alert;
import alert.system.application.model.Result;
import alert.system.application.services.AlertService;
import alert.system.application.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class RequestController {
    private final AlertService alertService;
    private final RequestService requestService;


    @PostMapping("/sendRequest")
    public void saveRequest(@RequestBody final Alert alert){
        boolean success = requestService.sendRequest(alert);
        System.out.println("sonuc: "+success);
        alertService.addResult(alert.getId(), success);


    }
}
