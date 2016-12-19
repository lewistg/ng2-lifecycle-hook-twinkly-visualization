import { NodeComponent } from './componentnode.component';

export enum LifecycleHook {
    NG_ON_CHANGES,
}

export interface LogEntry {
    node: NodeComponent,
    lifecycleHook: LifecycleHook,
}

export class ComponentNodeLifecycleLog {
    static LIFECYCLE_HOOK_COLORS = new Map([[LifecycleHook.NG_ON_CHANGES, {r: 153, g: 255, b: 0}]])
    livePlayback: boolean = true;
    record: boolean = false;
    private _entries: LogEntry[] = [];

    get length(): number {
        return this._entries.length;
    }

    log(entry: LogEntry) {
        if (this.livePlayback) {
            entry.node.flash(ComponentNodeLifecycleLog.LIFECYCLE_HOOK_COLORS.get(entry.lifecycleHook));
        }

        if (this.record) {
            this._entries.push(entry);
        }
    }

    get(entryIndex: number) {
        return this._entries[entryIndex];
    }

    clear() {
        this._entries = [];
    }
}