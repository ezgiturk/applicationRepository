package alert.system.application.controller;

import alert.system.application.model.Alert;
import alert.system.application.model.Result;
import alert.system.application.services.AlertService;
import alert.system.application.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class RequestController {
    private final AlertService alertService;
    private final RequestService requestService;


    @PostMapping("/sendRequest")
    public void saveRequest(@RequestBody final Alert alert) {
        boolean success = requestService.sendRequest(alert);
        System.out.println("sonuc: " + success);
    }
    @GetMapping("/result/{alertId}")
    public Set<Result> getResult(@PathVariable Long alertId){
        System.out.println("alId: "+alertId);
        return alertService.getAlertResult(alertId);
    }
}
