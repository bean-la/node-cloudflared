import { ChildProcess } from 'node:child_process';

/**
 * The path to the cloudflared binary.
 * If the `CLOUDFLARED_BIN` environment variable is set, it will be used; otherwise, {@link DEFAULT_CLOUDFLARED_BIN} will be used.
 * Can be overridden with {@link use}.
 */
declare let bin: string;
/**
 * Override the path to the cloudflared binary.
 * @param executable - The path to the cloudflared executable.
 */
declare function use(executable: string): void;

/**
 * Install cloudflared to the given path.
 * @param to The path to the binary to install.
 * @param version The version of cloudflared to install.
 * @returns The path to the binary that was installed.
 */
declare function install$1(to: string, version?: string): Promise<string>;

interface Connection {
    id: string;
    ip: string;
    location: string;
}

/**
 *  Create a tunnel.
 * @param options The options to pass to cloudflared.
 * @returns
 */
declare function tunnel(options?: Record<string, string | number | null>): {
    /** The URL of the tunnel */
    url: Promise<string>;
    /** The connections of the tunnel */
    connections: Promise<Connection>[];
    /** Spwaned cloudflared process */
    child: ChildProcess;
    /** Stop the cloudflared process */
    stop: ChildProcess["kill"];
};

/**
 * Cloudflared launchd identifier.
 * @platform macOS
 */
declare const identifier = "com.cloudflare.cloudflared";
/**
 * Path of service related files.
 * @platform macOS
 */
declare const MACOS_SERVICE_PATH: {
    readonly PLIST: string;
    readonly OUT: string;
    readonly ERR: string;
};
/**
 * Cloudflared Service API.
 */
declare const service: {
    install: typeof install;
    uninstall: typeof uninstall;
    exists: typeof exists;
    log: typeof log;
    err: typeof err;
    current: typeof current;
    clean: typeof clean;
    journal: typeof journal;
};
/**
 * Throw when service is already installed.
 */
declare class AlreadyInstalledError extends Error {
    constructor();
}
/**
 * Throw when service is not installed.
 */
declare class NotInstalledError extends Error {
    constructor();
}
/**
 * Install Cloudflared service.
 * @param token Tunnel service token.
 * @platform macOS, linux
 */
declare function install(token?: string): void;
/**
 * Uninstall Cloudflared service.
 * @platform macOS, linux
 */
declare function uninstall(): void;
/**
 * Get stdout log of cloudflared service. (Usually empty)
 * @returns stdout log of cloudflared service.
 * @platform macOS, linux (sysv)
 */
declare function log(): string;
/**
 * Get stderr log of cloudflared service. (cloudflared print all things here)
 * @returns stderr log of cloudflared service.
 * @platform macOS, linux (sysv)
 */
declare function err(): string;
/**
 * Get cloudflared service journal from journalctl.
 * @param n The number of entries to return.
 * @returns cloudflared service journal.
 * @platform linux (systemd)
 */
declare function journal(n?: number): string;
/**
 * Get informations of current running cloudflared service.
 * @returns informations of current running cloudflared service.
 * @platform macOS, linux
 */
declare function current(): {
    /** Tunnel ID */
    tunnelID: string;
    /** Connector ID */
    connectorID: string;
    /** The connections of the tunnel */
    connections: Connection[];
    /** Metrics Server Location */
    metrics: string;
    /** Tunnel Configuration */
    config: {
        ingress?: {
            service: string;
            hostname?: string;
        }[];
        [key: string]: unknown;
    };
};
/**
 * Clean up service log files.
 * @platform macOS
 */
declare function clean(): void;
/**
 * Check if cloudflared service is installed.
 * @returns true if service is installed, false otherwise.
 * @platform macOS, linux
 */
declare function exists(): boolean;

export { AlreadyInstalledError, type Connection, MACOS_SERVICE_PATH, NotInstalledError, bin, identifier, install$1 as install, service, tunnel, use };
