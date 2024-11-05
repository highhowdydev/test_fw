import winston, { type Logger as LoggerType } from "winston";

export class Logger {
	private logger: LoggerType;

	constructor() {
		this.logger = winston.createLogger({
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: "application-log/combined.log",
				}),
				new winston.transports.File({
					filename: "application-log/error.log",
					level: "error",
				}),
			],
		});
	}

	public info(message: string) {
		this.logger.info(message);
	}

	public warn(message: string) {
		this.logger.warn(message);
	}

	public error(message: string) {
		this.logger.error(message);
	}
}
