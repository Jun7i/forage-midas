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
public class TaskFourTests {
    static final Logger logger = LoggerFactory.getLogger(TaskFourTests.class);

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private UserPopulator userPopulator;

    @Autowired
    private FileLoader fileLoader;

    @Test
    void task_four_verifier() throws InterruptedException {
        userPopulator.populate();
        String[] transactionLines = fileLoader.loadStrings("/test_data/alskdjfh.fhdjsk");
        for (String transactionLine : transactionLines) {
            kafkaProducer.send(transactionLine);
        }
        Thread.sleep(2000);


        logger.info("----------------------------------------------------------");
        logger.info("----------------------------------------------------------");
        logger.info("----------------------------------------------------------");
        logger.info("use your debugger to find out what wilbur's balance is after all transactions are processed");
        logger.info("kill this test once you find the answer");
        //sender
        //User[id=9, name='wilbur', balance='3460.209961'
        //User[id=9, name='wilbur', balance='3452.209961'
        //User[id=9, name='wilbur', balance='3321.839844'
        //User[id=9, name='wilbur', balance='3193.369873'
        //User[id=9, name='wilbur', balance='3089.419922'
        //User[id=9, name='wilbur', balance='3073.419922'
        //User[id=9, name='wilbur', balance='3065.419922'
        //User[id=9, name='wilbur', balance='2935.049805'
        //User[id=9, name='wilbur', balance='2806.579834'
        //wilbur sent 103.95, new balance: 2702.63(last)
        while (true) {
            Thread.sleep(20000);
            logger.info("...");
        }
    }
}
