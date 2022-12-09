import {
  BaseServiceV2,
  validators,
} from '@eth-optimism/common-ts'
import assert from 'assert'

type Options = {
  test: string
}

type Metrics = {}

type State = {
  test: string
}

export class ChugSplashExecutor extends BaseServiceV2<Options, Metrics, State> {
  constructor(options?: Partial<Options>) {
    super({
      name: 'chugsplash-executor',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      version: require('../package.json').version,
      loop: true,
      loopIntervalMs: 1000,
      options,
      optionsSpec: {
        test: {
          desc: 'Test option',
          validator: validators.str,
          default: 'default value',
        },
      },
      metricsSpec: {},
    })
  }

  async init() {
    console.log(this.options)
    assert(
        this.options.test === 'passed in value',
        `Passed in value is "${this.options.test}" when it should be "passed in value"`
    )
  }

  async main() {}
}

if (require.main === module) {
  const service = new ChugSplashExecutor({test: 'passed in value'})
  service.run()
  service.stop()
}
