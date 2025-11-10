package com.jpmc.midascore.component;

import java.sql.Timestamp;
import com.jpmc.midascore.entity.TransactionRecord;
import com.jpmc.midascore.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class TestDataLoader {
    private static final Logger logger = LoggerFactory.getLogger(TestDataLoader.class);
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private FileLoader fileLoader;

    @PostConstruct
    public void loadTestData() {
        logger.info("Loading test data from test_data/mnbvcxz.vbnm");
        String[] transactionLines = fileLoader.loadStrings("/test_data/mnbvcxz.vbnm");
            
        try {
            for (String line : transactionLines) {
                // Parse CSV line (format: senderId, recipientId, amount)
                String[] parts = line.split(",\\s*");
                Long senderId = Long.parseLong(parts[0]);
                Long recipientId = Long.parseLong(parts[1]);
                Double amount = Double.parseDouble(parts[2]);
                
                // Create and save transaction record
                TransactionRecord record = new TransactionRecord(
                    senderId,
                    recipientId,
                    amount.floatValue(),
                    "COMPLETED", // Default status
                    new Timestamp(System.currentTimeMillis()) // Current timestamp
                );
                
                transactionRepository.save(record);
                logger.debug("Saved transaction: {}", record);
            }
            
            logger.info("Test data loaded successfully!");
            logger.info("You can now access the transactions at: http://localhost:8081/transactions");
        } catch (Exception e) {
            logger.error("Error loading test data: {}", e.getMessage(), e);
        }
    }
}