//Create a pub sub library that can be plugged and used anywhere.
//subscribe -> Event --> returns function f that will unscubscribe.
//publish - takes an event and data and publish
// this is an example of observer pattern.
type Func = () => void;
type Callback = (data: any) => void;
type Events = Record<string, Array<Callback>>;

class PubSub {
  private eventList: Events = {};
  subscribe(event: string, eventListener: Callback): Func {
    //That event doesn't exist.
    if (!this.eventList[event]) {
      this.eventList[event] = [];
    }
    this.eventList[event].push(eventListener);
    //Unsubscribe
    return (): void => {
      this.eventList[event] = this.eventList[event].filter(
        (listener) => listener !== eventListener,
      );
    };
  }
  publish(event: any, data: any): void {
    if (!this.eventList[event]) {
      return;
    }
    this.eventList[event].forEach((currentEventListener) =>
      currentEventListener(data),
    );
  }
}
const pubsub = new PubSub();
const sub1 = pubsub.subscribe("msg1", (data) => console.log("1: " + data));
const sub2 = pubsub.subscribe("msg2", (data) => console.log("2: " + data));
setInterval(() => {
  pubsub.publish("msg1", "msg");
  pubsub.publish("msg2", "msg");
}, 1000);
