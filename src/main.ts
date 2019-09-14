const https = require('https');

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

import * as args from './args';

async function get(target: string, component: string): Promise<string> {
    const url = `https://rust-lang.github.io/rustup-components-history/${target}/${component}`;

    return new Promise((resolve, reject) => {
        let req = https.get(url, (resp) => {
            // Output is quite small (ex. `"2019-09-13\n"` string),
            // so it is okay not to use any smart buffers here
            let data: string = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data.trim());
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    let opts;
    try {
        opts = args.components_args();
    } catch (error) {
        core.setFailed(error.message);
        throw error;
    }

    try {
        const date = await get(opts.target, opts.component);
        const toolchain = `nightly-${date}-${opts.target}`;

        core.setOutput('toolchain', toolchain);
    } catch (error) {
        core.setFailed(error.message);
        throw error;
    }
}

run();
