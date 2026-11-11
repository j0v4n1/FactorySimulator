import { HubConnectionBuilder } from '@microsoft/signalr';

export const createConnection = () => {
    return new HubConnectionBuilder()
        .withUrl('http://localhost:5188/gameHub')
        .withAutomaticReconnect()
        .build();
};