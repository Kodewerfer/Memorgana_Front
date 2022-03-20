/**
 * Simple Singleton Logger for outputing different logs in different enviroment.
 * 
 * @Logger.currentEnv 
 * tells the logger what is the current enviroment. after the first time setup, subsequential setting output a warning message to the console
 * default enviroment is 'prod'
 * 
 * @Logger.dev()
 * @logger.log()
 */

export const enum LoggerEnvs { dev = 'dev', prod = 'prod' }

class SimpleLogger {

  private _currentEnv = LoggerEnvs.prod
  private isCurrentEnvSet = false

  set currentEnv(env: LoggerEnvs) {

    if (this.isCurrentEnvSet) {
      console.warn("Simple Logger: No Reseting currentEnv");
      return;
    }

    this._currentEnv = env;
    this.isCurrentEnvSet = true;
  }
  get currentEnv() {
    return this._currentEnv;
  }

  private static uInstance: SimpleLogger
  private constructor(isProd = LoggerEnvs.prod) {

    this._currentEnv = isProd;

  }
  static getLogger(): SimpleLogger {
    if (!SimpleLogger.uInstance) {
      SimpleLogger.uInstance = new SimpleLogger();
    }
    return SimpleLogger.uInstance;
  }

  dev(log: any, color?: string) {
    if (this.currentEnv !== LoggerEnvs.dev) {
      return;
    }

    if (!color) return console.log(log);

    return console.log(log, `color:${color}`);
  }
  log(log: any, color?: string) {
    if (!color) return console.log(log);
    return console.info(log, `color:${color}`);
  }


}

const Logger = SimpleLogger.getLogger();

export default Logger;