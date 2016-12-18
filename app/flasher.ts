interface Color {
    r: number,
    g: number,
    b: number
}

interface Flash {
    color: Color;
    lifeSpan: number|undefined;
}

export class Flasher {
    private static readonly FLASH_LIFESPAN = 1000;
    private _context: CanvasRenderingContext2D;
    private _flashes: Flash[];
    private _prevTime: number|undefined;

    constructor(private _canvas: HTMLCanvasElement) {
        this._context = <CanvasRenderingContext2D> this._canvas.getContext('2d');
    }

    flash(color: Color) {
        this._flashes.push({
            color: color,
            lifeSpan: undefined
        })

        if (this._flashes.length == 1) {
            this._step();
        }
    }

    private _step() {
        let currTime = Date.now();
        let timeDelta = (this._prevTime === undefined ? 0 : currTime - this._prevTime);

        this._context.clearRect(
            0,
            0,
            this._canvas.width,
            this._canvas.height);

        let unexpiredFlashes: Flash[] = [];
        this._flashes.forEach((flash) => {
            if (flash.lifeSpan === undefined) {
                flash.lifeSpan = 0;
            } else {
                flash.lifeSpan += timeDelta;
            }

            if (flash.lifeSpan > Flasher.FLASH_LIFESPAN) {
                return;
            }

            unexpiredFlashes.push(flash);
        });

        this._flashes = unexpiredFlashes;
        if (this._flashes.length > 0) {
            requestAnimationFrame(() => this._step());
            this._prevTime = currTime;
        } else {
            this._prevTime = undefined;
        }
    }
}
