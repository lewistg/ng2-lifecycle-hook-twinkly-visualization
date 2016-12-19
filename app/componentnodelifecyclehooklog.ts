import {NodeComponent} from './componentnode.component';

export enum LifecycleHook {
    NG_ON_CHANGES,
}

export interface LogEntry {
    node: NodeComponent,
    lifecycleHook: LifecycleHook,
}

export class ComponentNodeLifecycleLog {
    private static LIFECYCLE_HOOK_COLORS = new Map([[LifecycleHook.NG_ON_CHANGES, {r: 153, g: 255, b: 0}]])
    livePlayback: boolean = true;
    record: boolean = false;
    private _entries: LogEntry[] = [];

    log(entry: LogEntry) {
        if (this.livePlayback) {
            entry.node.flash(ComponentNodeLifecycleLog.LIFECYCLE_HOOK_COLORS.get(entry.lifecycleHook));
        }

        if (this.record) {
            this._entries.push(entry);
        }
    }

    clear() {
        this._entries = [];
    }
}
