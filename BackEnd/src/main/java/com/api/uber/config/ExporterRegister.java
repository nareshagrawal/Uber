package com.api.uber.config;



import io.prometheus.client.Collector;
import io.prometheus.client.hotspot.MemoryPoolsExports;
import io.prometheus.client.hotspot.StandardExports;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;


public class ExporterRegister {
    private List<Collector> collectors;

    public ExporterRegister(List<Collector> collectors) {
        for (Collector collector : collectors) {
            collector.register();
        }
        this.collectors = collectors;
    }

    public List<Collector> getCollectors() {
        return collectors;
    }
}

