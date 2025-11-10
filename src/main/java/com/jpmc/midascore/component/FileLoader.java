package com.jpmc.midascore.component;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class FileLoader {
    public String[] loadStrings(String path) {
        // First try loading from main resources
        try {
            ClassPathResource resource = new ClassPathResource(path.startsWith("/") ? path.substring(1) : path);
            List<String> lines = new ArrayList<>();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    lines.add(line);
                }
            }
            return lines.toArray(new String[0]);
        } catch (IOException mainE) {
            // If not found in main resources, try test resources
            try {
                ClassPathResource testResource = new ClassPathResource("../../test-classes" + path);
                List<String> lines = new ArrayList<>();
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(testResource.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        lines.add(line);
                    }
                }
                return lines.toArray(new String[0]);
            } catch (IOException testE) {
                throw new RuntimeException("Failed to load file from both main and test resources: " + path, testE);
            }
        }
    }
}