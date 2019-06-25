const ROLES = [
  { value: 'Admin', label: 'ادمین' },
  { value: 'Reviewer', label: 'بازرس' },
  { value: 'SimpleUser', label: 'کاربر' },
];

const ERRORS = {
  ERROR: 'error',
  TITLE: 'خطا',
  ROLE_NOT_CHOSEN: 'سطح دسترسی را انتخاب کنید',
  FIELD_EMPTY: 'لطفا همه ی فیلدها رو پر کنید',
  PASSWORD_NOT_MATCH: 'کلمه های عبور هم خوانی ندارند',
  PASSWORD_SHORT: 'حداقل طول رمز عبور 8 کاراکتر است',
  INVALID_PHONE: 'شماره تلفن نامعتبر',
  REPEATED_USER: 'نام کاربری قبلا ثبت است',
  INVALID_USER: 'نام کاربری وجود ندارد',
  CONNECTION_FAILED: 'ارتباط ناموفق.دوباره تلاش کنید',
  NO_AGREEMENT: 'قوانین سایت را بپذیرید',
  EMPTY_SEARCH_BOX: 'لطفا موارد جستجو را پر کنید',
};

const SUCCESS = {
  SUCCESS: 'success',
  TITLE: 'موفقیت',
  CODE_SENT: 'کد برای شما ارسال شد',
  USER_CREATED: 'کاربر با موفقیت ایجاد شد',
  PASSWORD_CHANGED: 'رمزعبور با موفقیت تغییر یافت',
};
const COOKIE_EXPIRATION = 356;
const REQUEST_TIMEOUT = 4000;
const SERVER = 'http://localhost:3000';
const LIST_TYPES = {
  car: 'car',
  violation: 'violation',
};
const RECORD_TYPES = {
  violation: 'violation',
  car: 'car',
};
const OPERATIONS = {
  suspend: 'suspend',
  approve: 'approve',
  delete: 'delete',
  addToQueue: 'addToQueue',
};
const SELECTED_RECORDS_EXTENT = {
  one: 'one',
  chosenOnes: 'chosenOnes',
  all: 'all',
};
export {
  ERRORS,
  ROLES,
  COOKIE_EXPIRATION,
  REQUEST_TIMEOUT,
  SERVER,
  SUCCESS,
  LIST_TYPES,
  RECORD_TYPES,
  OPERATIONS,
  SELECTED_RECORDS_EXTENT,
};
