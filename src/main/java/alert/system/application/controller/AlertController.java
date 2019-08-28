package alert.system.application.controller;

import alert.system.application.model.Alert;
import alert.system.application.services.AlertService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@EnableScheduling
@RestController
@Transactional
@CrossOrigin("*")
public class AlertController {
    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping("/alerts/{id}")
    public Optional<Alert> getAlert(@PathVariable Long id) {
        return alertService.getAlert(id);
    }

    @PostMapping("/add-alert")
    public Alert addAlert(@RequestBody final Alert alert){
        alert.setResultList(new HashSet<>());
        return alertService.addAlert(alert);
    }

    @GetMapping("/alerts")
    public List alertList(){
        return alertService.allAlerts();

    }
    @DeleteMapping("/alert/{alertId}")
    public void deleteAlert(@PathVariable Long alertId){
        alertService.deleteAlert(alertId);
    }

    @PutMapping("update-alert/{alertId}")
    public Alert updateAlert(@RequestBody final Alert alert, @PathVariable Long alertId){
        System.out.println("DDDDDDDDDDD: "+ alertId);
        Optional<Alert> updatedAlert = alertService.findById(alertId);
        if (updatedAlert.isPresent()){
            System.out.println("update alertId: "+ updatedAlert.get().getId());
            System.out.println("update alertName: "+ updatedAlert.get().getName());
            alert.setId(updatedAlert.get().getId());
            return alertService.save(alert);

        }
        return null;
    }
}
