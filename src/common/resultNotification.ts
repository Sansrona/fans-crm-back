export class ResultNotification<T = null> {
  constructor(data: T | null = null) {
    this.data = data;
  }

  code = 0;
  data: T | null = null;
  message: string = '';
  extensions: NotificationExtension[] = [];

  get hasError(): boolean {
    return this.code !== 0;
  }

  addError(
    message: string,
    key: string | null = null,
    code: number | null = null,
  ): void {
    this.code = code ?? 1;
    this.extensions.push(new NotificationExtension(message, key));
  }

  addData(data: T): void {
    this.data = data;
  }

  getExtensions(): NotificationExtension[] {
    return this.extensions;
  }
}

export class NotificationExtension {
  constructor(
    public message: string,
    public key: string | null,
  ) {}
}

export class DomainResultNotification<
  TData = null,
> extends ResultNotification<TData> {
  static create<T>(
    mainNotification: DomainResultNotification<T>,
    ...otherNotifications: DomainResultNotification[]
  ) {
    const domainResultNotification = new DomainResultNotification<T>();

    if (!!mainNotification.data) {
      domainResultNotification.addData(mainNotification.data);
    }

    mainNotification.extensions.forEach((e) => {
      domainResultNotification.addError(e.message, e.key);
    });

    otherNotifications.forEach((n) => {
      n.extensions.forEach((e) => {
        domainResultNotification.addError(e.message, e.key);
      });
    });

    domainResultNotification.message = mainNotification.message;
    domainResultNotification.code = mainNotification.code;

    return domainResultNotification;
  }
}
