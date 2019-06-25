// wiki.js - Wiki route module.
import express from 'express';
import { databasePath } from '../stateManager';
import sqlite from 'sqlite';

const router = express.Router();
const dbPromise = sqlite.open(databasePath, { Promise });
const SUCCESS = 'success';
const FAIL = 'error';

// ==================== STARTING OF FUNCTIONS ==============================
async function updateState(data) {
  let result = '';
  try {
    const updateQuery =
      'INSERT OR REPLACE INTO State (stateID,state) VALUES (?, ?)';
    const pk = data.userSecretToken;
    const newState = JSON.stringify(data);
    const db = await dbPromise;
    await Promise.all([db.run(updateQuery, pk, newState)]);
    result = {
      status: SUCCESS,
    };
  } catch (error) {
    result = {
      status: FAIL,
      payload: error,
    };
  }
  return result;
}
async function removeState(id) {
  let result = '';
  console.log('_++++++++++++++++++++++state removed++++++++++++++++++++ ', id);
  try {
    const deleteQuery = 'DELETE FROM State WHERE stateID = ?';
    const db = await dbPromise;
    await Promise.all([db.run(deleteQuery, id)]);
    result = {
      status: SUCCESS,
    };
  } catch (error) {
    result = {
      status: FAIL,
      payload: error,
    };
  }
  return result;
}
// ==================== ENDING OF FUNCTIONS ==============================

// ==================== STARTING OF CONTROLLERS  ==============================
router.post('/setState', async (req, res, next) => {
  const result = await updateState(req.body);
  res.send(result);
});
router.post('/getState', async (req, res, next) => {
  let result = '';

  try {
    const db = await dbPromise;
    const state = await Promise.all([
      db.get(
        'SELECT state FROM State WHERE stateID = ? ',
        req.body.userSecretToken,
      ),
    ]);
    console.log(
      '---------------------- in get state ------------------',
      state[0],
    );
    if (state[0] === undefined) {
      result = {
        status: 'error',
        payload: 'IdToken Not Valid',
      };
    } else {
      result = {
        status: SUCCESS,
        payload: JSON.parse(state[0].state),
      };
    }
  } catch (error) {
    result = {
      status: 'error',
      payload: error,
    };
  }
  res.send(result);
});
router.post('/removeState', async (req, res, next) => {
  const pk = req.body.userSecretToken;
  const result = await removeState(pk);
  res.clearCookie('userSecretToken');
  res.send(result);
});
// ==================== ENDING OF CONTROLLERS  ==============================

export default router;
