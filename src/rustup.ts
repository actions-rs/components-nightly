/**
 * Generate the default Rust target triple for current virtual environment.
 *
 * As for `2019-09-16`, only Linux, macOS and Windows for x86_64 are available,
 * but we are making it more generic to cover any impossible cases.
 */
export function getDefaultTargetTriple(): string {
    let triple: string[] = [];

    switch (process.arch) {
        case 'arm':
        case 'mips':
        case 'mipsel':
        case 's390x':
            triple.push(process.arch);
            break;
        case 'arm64':
            triple.push('aarch64');
            break;
        case 'ppc64':
            triple.push('powerpc64');
            break;
        case 'x32':
            triple.push('i686');
            break;
        case 'x64':
            triple.push('x86_64');
            break;
        default:
            // ia32, ppc, s390
            throw new Error(`Unknown architecture: ${process.arch}`);
    }

    switch (process.platform) {
        case 'aix':
            break;
        case 'darwin':
            triple.push('apple');
            triple.push('darwin');
            break;
        case 'freebsd':
            triple.push('unknown');
            triple.push('freebsd');
            break;
        case 'linux':
            triple.push('unknown');
            triple.push('linux');
            triple.push('gnu');
            break;
        case 'openbsd':
            triple.push('unknown');
            triple.push('openbsd');
            break;
        case 'sunos':
            triple.push('sun');
            triple.push('solaris');
            break;
        case 'win32':
            triple.push('pc');
            triple.push('windows');
            triple.push('msvc');
            break;
       default:
        throw new Error(`Unknown platform: ${process.platform}`);
    }


    return triple.join('-');
}
