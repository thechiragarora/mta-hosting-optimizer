import { connect, disconnect } from 'mongoose';

class Database {
  public static open(url) {
      return connect(url).then(
        () => { console.log('MongoDB connected Successfully'); },
        (err) => {
          console.log('Error while connecting to MongoDB');
          throw new Error(err);
        },
      );
  }
  public static disconnect() {
    disconnect();
  }
}

export default Database;