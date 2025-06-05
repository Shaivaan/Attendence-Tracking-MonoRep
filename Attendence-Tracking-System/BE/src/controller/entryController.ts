import { Request, Response } from 'express';
import fs from 'fs';
import { EntrySchema } from '../model/entrySchema';
import { statusMessage } from './utils';

export const entryRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    const photoFile = req.file as Express.Multer.File;
    const photoUrl = `${req.protocol}://${req.get('host')}/uploads/photos/${photoFile.filename}`;


    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const todayEntry = await EntrySchema.findOne({
      email: email.toLowerCase(),
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    if (!todayEntry) {
      const newEntry = new EntrySchema({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        photo: `/uploads/photos/${photoFile.filename}`,
        entryType: 'login'
      });

      const savedEntry = await newEntry.save();

      res.status(201).json({
        success: true,
        message: 'Login recorded successfully',
        data: {
          id: savedEntry._id,
          email: savedEntry.email,
          name: savedEntry.name,
          photo: photoUrl,
          entryType: savedEntry.entryType,
          time: savedEntry.createdAt
        }
      });

    } else if (todayEntry.entryType === 'login') {
      todayEntry.entryType = 'logout';
      todayEntry.photo = `/uploads/photos/${photoFile.filename}`; // Update with new photo
      const updatedEntry = await todayEntry.save();

      res.status(200).json({
        ...statusMessage(true,'Logout recorded successfully'),
        data: {
          id: updatedEntry._id,
          email: updatedEntry.email,
          name: updatedEntry.name,
          photo: photoUrl,
          entryType: updatedEntry.entryType,
          loginTime: updatedEntry.createdAt,
          logoutTime: new Date()
        }
      });

    } else {
      fs.unlinkSync(photoFile.path);
      res.status(400).json(statusMessage(false,'Already checked out for the day'));
    }

  } catch (error: any) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json(statusMessage(false,'Something went wrong'));
  }
};



export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const todayEntries = await EntrySchema.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });


    const checkIn = todayEntries.filter((entry:any) => entry.entryType === 'login').length;
    const checkout = todayEntries.filter((entry:any) => entry.entryType === 'logout').length;
    
    const totalAttendee = todayEntries.length;

    res.status(200).json({
      success: true,
      data: {
        checkIn,
        checkout,
        totalAttendee
      }
    });

  } catch (error: any) {
    res.status(500).json(statusMessage(false,'Something went wrong'));
  }
};



export const getAttendanceHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);


    const todayEntries = await EntrySchema.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).sort({ createdAt: -1 }); // Latest first

    const history = todayEntries.map((entry:any) => ({
      email: entry.email,
      name: entry.name,
      checkIn: {
        time: entry.createdAt,
        photo: entry.entryType === 'login' ? entry.photo : entry.photo 
      },
      checkout: entry.entryType === 'logout' ? {
        time: entry.updatedAt,
        photo: entry.photo
      } : null
    }));

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error: any) {
    res.status(500).json(statusMessage(false,'Something went wrong'));
  }
};