import os
from pickle import FALSE
import cv2
import numpy as np
from tqdm import tqdm
import matplotlib.pyplot as plt

import torch
import torch.nn as nn
import torch.nn.functional as F

import torch.optim as optim

REBUILD_DATA = False

class FreshStale():
    IMG_SIZE = 50
    FRESH = "Apples/fresh_apple"
    STALE = "Apples/stale_apple"
    LABELS = {FRESH: 0, STALE: 1}
    training_data = []
    freshCount = 0
    staleCount = 0
    
    def make_training_data(self):
        for label in self.LABELS:
            print(label)
            for f in tqdm(os.listdir(label)):
                try:
                    path = os.path.join(label, f)
                    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
                    img = cv2.resize(img, (self.IMG_SIZE, self.IMG_SIZE))
                    self.training_data.append([np.array(img), np.eye(2)[self.LABELS[label]]])
                    
                    if label == self.FRESH:
                        self.freshCount += 1
                    elif label == self.STALE:
                        self.staleCount += 1
                except Exception as e:
                    pass
                
        
        np.random.shuffle(self.training_data)
        np.save("training_data.npy", self.training_data)
        print("Fresh: ", self.freshCount)
        print("Stale: ", self.staleCount)
        
if REBUILD_DATA:
    freshstale = FreshStale()
    freshstale.make_training_data()


class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 5)
        self.conv2 = nn.Conv2d(32, 64, 5)
        self.conv3 = nn.Conv2d(64, 128, 5)
        
        x = torch.randn(50, 50).view(-1, 1, 50, 50)
        self._to_linear = None
        self.convs(x)
        
        self.fc1 = nn.Linear(self._to_linear, 512)
        self.fc2 = nn.Linear(512, 2)
        
    def convs(self, x):
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        x = F.max_pool2d(F.relu(self.conv2(x)), (2, 2))
        x = F.max_pool2d(F.relu(self.conv3(x)), (2, 2))
        
        if self._to_linear is None:
            self._to_linear = x[0].shape[0] * x[0].shape[1] * x[0].shape[2]
        return x
    
    def forward(self, x):
        x = self.convs(x)
        x = x.view(-1, self._to_linear)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
    
TRAIN = False

if (TRAIN):
    net = Net()
    training_data = np.load("training_data.npy", allow_pickle=True)
    print(len(training_data))

    optimizer = optim.Adam(net.parameters(), lr=0.001)
    loss_function = nn.MSELoss()

    x = torch.Tensor(np.array([i[0] for i in training_data])).view(-1, 50, 50)
    x = x/255.0
    y = torch.Tensor(np.array([i[1] for i in training_data]))

    VAL_PCT = 0.1
    val_size = int(len(x) * VAL_PCT)
    print(val_size)

    train_x = x[:-val_size]
    train_y = y[:-val_size]

    test_x = x[-val_size:]
    test_y = y[-val_size:]

    BATCH_SIZE = 200
    EPOCHS = 100

    for epoch in range(EPOCHS):
        for i in tqdm(range(0, len(train_x), BATCH_SIZE)):
            batch_x = train_x[i:i+BATCH_SIZE].view(-1, 1, 50, 50)
            batch_y = train_y[i:i+BATCH_SIZE]
            
            net.zero_grad()
            outputs = net(batch_x)
            loss = loss_function(outputs, batch_y)
            loss.backward()
            optimizer.step()
            
        print(loss)
        print("epoch: ", epoch)
        
    correct = 0
    total = 0
    with torch.no_grad():
        for i in tqdm(range(len(test_x))):
            real_class = torch.argmax(test_y[i])
            net_out = net(test_x[i].view(-1, 1, 50, 50))[0]
            predicted_class = torch.argmax(net_out)
            if predicted_class == real_class:
                correct += 1
            total += 1
            
    print ("accuracy: ", round(correct/total, 3))
    torch.save(net.state_dict(), "model.pt")
    
RUN = False

def evaluate_image(path):
    net = Net()
    net.load_state_dict(torch.load("model.pt"))
    net.eval()
    
    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (50, 50))
    img = np.array(img)
    img = torch.Tensor(img)
    img = img/255.0
    net_out = net(img.view(-1, 1, 50, 50))[0]
    prediction = torch.argmax(net_out)
    if (prediction == 0):
        print("Fresh")
        return "Fresh"
    else:
        print("Stale")
        return "Stale"
    
if __name__ == '__main__':
    if (RUN):
        evaluate_image("./apple_image.png")