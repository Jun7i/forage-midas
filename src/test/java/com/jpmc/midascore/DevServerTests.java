package com.jpmc.midascore;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
@DirtiesContext
@EmbeddedKafka(partitions = 1, brokerProperties = {"listeners=PLAINTEXT://localhost:9092", "port=9092"})
public class DevServerTests {
    static final Logger logger = LoggerFactory.getLogger(DevServerTests.class);

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private UserPopulator userPopulator;

    @Autowired
    private FileLoader fileLoader;

    @Test
    void runDevServerWithTestData() throws InterruptedException {
        logger.info("==========================================================");
        logger.info("Starting Dev Server with Test Data");
        logger.info("==========================================================");
        
        // Populate users
        userPopulator.populate();
        logger.info("Users populated in database");
        
        // Load and send transactions from test data files
        //String[] transactionLines1 = fileLoader.loadStrings("/test_data/alskdjfh.fhdjsk");
        //String[] transactionLines2 = fileLoader.loadStrings("/test_data/lkjhgfdsa.hjkl");
        String[] transactionLines3 = fileLoader.loadStrings("/test_data/mnbvcxz.vbnm");
        
        logger.info("Sending transactions to Kafka...");
//        for (String transactionLine : transactionLines1) {
//            kafkaProducer.send(transactionLine);
//        }
//        for (String transactionLine : transactionLines2) {
//            kafkaProducer.send(transactionLine);
//        }
        for (String transactionLine : transactionLines3) {
            kafkaProducer.send(transactionLine);
        }
        
        // Wait for messages to be consumed
        Thread.sleep(3000);

        logger.info("==========================================================");
        logger.info("✓ Dev Server is running with test data!");
        logger.info("==========================================================");
        logger.info("Backend API: http://localhost:8081/transactions");
        logger.info("Frontend:    http://localhost:5173/");
        logger.info("H2 Console:  http://localhost:8081/h2-console");
        logger.info("==========================================================");
        logger.info("Press Ctrl+C to stop the server");
        logger.info("==========================================================");
        
        // Keep the test running so the server stays up
        while (true) {
            Thread.sleep(30000);
            logger.info("Server still running... (transactions available at /transactions endpoint)");
        }
    }
}
