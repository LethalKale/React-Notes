import * as log from "loglevel";

export class Log {
    private readonly m_title = "";
    private readonly m_logger = log.getLogger(this.m_title);
  
    public trace(message: string): void  {
      return this.m_logger.trace(message);
    }
  
    public debug(message: string): void {
      return this.m_logger.debug(message);
    }
  
    public info(message: string): void {
      return this.m_logger.info(message);
    }
  
    public warn(message: string): void {
      return this.m_logger.warn(message);
    }
  
    public error(message: string): void {
      return this.m_logger.error(message);
    }
  }
  
  export default new Log();
