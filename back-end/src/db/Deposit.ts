import Base from './Base'
import { Deposit } from './schema/Deposit'

export default class extends Base {
    protected getSchema(){
        return Deposit
    }
    protected getName(){
        return 'deposit'
    }
    protected rejectFields(){
        return {}
    }
}
