import * as args from '../src/args'

const testEnvVars = {
}

describe('actions-rs/components-nightly', () => {
    beforeEach(() => {
    for (const key in testEnvVars)
        process.env[key] = testEnvVars[key as keyof typeof testEnvVars]
    })

    it('Should do something', async () => {
    });
});
