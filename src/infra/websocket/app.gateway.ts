import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ObterDesastre } from 'src/modules/disasters/useCases/ObterDesastre/ObterDesastre';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly getDisasterService: ObterDesastre) {}
  afterInit(server: Server) {
    this.logger.log('Initialized Websocket!');
  }
  handleConnection(client: Socket) {
    console.log('client connected');
    this.logger.log(`Client connected: ${client.id}`, 'AppGateway');
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('new_disaster')
  async handleMessage(client: Socket, payload: any) {
    const disaster = await this.getDisasterService.execute(payload);
    this.logger.log('received new disaster notification');
    this.server.emit(
      'new_disaster_notification',
      {
        ...disaster,
        client_id: client.id,
      },
      client.id,
    );
  }
}
