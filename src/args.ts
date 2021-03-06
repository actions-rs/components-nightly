import * as core from '@actions/core';

import * as rustup from './rustup';

// Workaround for a GH bug: https://github.com/actions/toolkit/issues/127
//
// For input `all-features: true` it will generate the `INPUT_ALL-FEATURES: true`
// env variable, which looks too weird.
// Here we are trying to get proper name `INPUT_NO_DEFAULT_FEATURES` first,
// and if it does not exist, trying the `INPUT_NO-DEFAULT-FEATURES`
function getInput(name: string, options?: core.InputOptions): string {
    const inputFullName = name.replace(/-/g, '_');
    let value = core.getInput(inputFullName, options);
    if (value.length > 0) {
        return value
    }

    return core.getInput(name)
}

export interface ComponentsOptions {
    target: string,
    component: string
}

export function components_args(): ComponentsOptions {
    let target = getInput('target');
    if (target.length == 0) {
        target = rustup.getDefaultTargetTriple();
        core.debug(`Input "target" is not set, using ${target} as a default`);
    }
    return {
        target: target,
        component: getInput('component', {required: true})
    };
}
