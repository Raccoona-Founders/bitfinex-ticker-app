import { forEach } from 'lodash';
import { configure } from 'mobx';
import ModelAsyncStorage from './common/model-async-storage';

import TickerModel from './ticker-model';
import UserModel from './user-model';

configure({ enforceActions: 'observed' });

export default async function buildAppStore(): Promise<mobx.Store> {
    const userModel = UserModel.create();

    const storage: mobx.Store = {
        User: userModel,
        Ticker: TickerModel.create(),
    };

    const awaitInitializations: Array<PromiseLike<any>> = [];

    forEach(storage, (item: Object) => {
        if (item instanceof ModelAsyncStorage) {
            awaitInitializations.push(item.initialize());
        }
    });

    await Promise.all(awaitInitializations);

    return storage;
}
