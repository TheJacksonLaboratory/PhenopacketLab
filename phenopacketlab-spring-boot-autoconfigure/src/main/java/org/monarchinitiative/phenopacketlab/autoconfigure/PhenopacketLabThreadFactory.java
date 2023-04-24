package org.monarchinitiative.phenopacketlab.autoconfigure;

import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

class PhenopacketLabThreadFactory implements ThreadFactory {

    private final AtomicInteger threadCounter = new AtomicInteger();

    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(r);
        thread.setName(String.format("plab-worker-%d", threadCounter.getAndIncrement()));
        return thread;
    }
}
