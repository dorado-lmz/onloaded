import forEach from '@arr/foreach';

function noop() {}

export default function (elem, opts) {
	opts = opts || {};

	if (typeof elem === 'string') {
		elem = document.querySelectorAll(elem);
	} else if (elem.length == void 0) {
		elem = [elem]; // was single elem
	}

	let ok = err = 0;
	const total = elem.length;

	function isDone() {
		let perc = (ok + err) / total;
		let func = perc === 1 ? opts.onComplete : opts.onProgress;
		(func || noop)(perc, { failed:err, loaded:ok, total });
	}

	function onload() {
		ok++ && (opts.onLoad || noop)(this) && isDone();
	}

	function onerror() {
		err++ && (opts.onError || noop)(this) && isDone();
	}

	forEach(elem, el => {
		el.onload = onload;
		el.onerror = onerror;
	});
}
