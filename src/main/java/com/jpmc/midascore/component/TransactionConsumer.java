package com.jpmc.midascore.component;

import com.jpmc.midascore.foundation.Transaction;
import com.jpmc.midascore.entity.UserRecord;
import com.jpmc.midascore.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class TransactionConsumer {
    private static final Logger LOG = LoggerFactory.getLogger(TransactionConsumer.class);
    private List<String> waldorfTransactions = new ArrayList<>();
    private List<String> wilburTransactions = new ArrayList<>();
    private AtomicInteger transactionCounter = new AtomicInteger(0);

    @Autowired
    private UserRepository userRepository;

    @KafkaListener(topics = "${general.kafka-topic}", groupId = "midas-core-consumers")
    @Transactional
    public void consume(Transaction transaction) {

        LOG.info("Consumed message: " + transaction);

        UserRecord sender = userRepository.findById(transaction.getSenderId());
        UserRecord recipient = userRepository.findById(transaction.getRecipientId());

        sender.setBalance(sender.getBalance() - transaction.getAmount());
        recipient.setBalance(recipient.getBalance() + transaction.getAmount());

        // Track Waldorf's transactions
        if (recipient.getName().equals("waldorf")) {
            waldorfTransactions.add(String.format("Waldorf received %.2f, new balance: %.2f",
                transaction.getAmount(), recipient.getBalance()));
        }
        if (sender.getName().equals("waldorf")) {
            waldorfTransactions.add(String.format("Waldorf sent %.2f, new balance: %.2f",
                transaction.getAmount(), sender.getBalance()));
        }
        if (recipient.getName().equals("wilbur")) {
            wilburTransactions.add(String.format("Wilbur received %.2f, new balance: %.2f",
                    transaction.getAmount(), recipient.getBalance()));
        }
        if (sender.getName().equals("wilbur")) {
            wilburTransactions.add(String.format("Wilbur sent %.2f, new balance: %.2f",
                    transaction.getAmount(), sender.getBalance()));
        }
        LOG.info("Waldorf transactions: " + waldorfTransactions);
        LOG.info("Wilbur transactions: " + wilburTransactions);

        userRepository.save(sender); //breakpoint for task 34
        userRepository.save(recipient);
    }

    // Add getter to access the stored transactions
    public List<String> getWaldorfTransactions() {
        return waldorfTransactions;
    }
    public List<String> getWilburTransactions() {
        return wilburTransactions;
    }
}