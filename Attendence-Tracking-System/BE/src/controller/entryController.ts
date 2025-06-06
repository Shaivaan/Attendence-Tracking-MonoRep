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

    const entryCount = await EntrySchema.countDocuments({
      email: email.toLowerCase(),
      createdAt: { $gte: startOfDay, $lt: endOfDay }
    });

    if (entryCount === 0) {
      const loginEntry = new EntrySchema({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        photo: `/uploads/photos/${photoFile.filename}`,
        entryType: 'login'
      });
      
      await loginEntry.save();
      
      res.status(201).json({
        success: true,
        message: 'Login recorded',
        data: { entryType: 'login', photo: photoUrl }
      });
      
    } else if (entryCount === 1) {
      const logoutEntry = new EntrySchema({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        photo: `/uploads/photos/${photoFile.filename}`,
        entryType: 'logout'
      });
      
      await logoutEntry.save();
      
      res.status(201).json({
        success: true,
        message: 'Logout recorded',
        data: { entryType: 'logout', photo: photoUrl }
      });
      
    } else {
      // THIRD CALL - TWO ENTRIES ALREADY EXIST
      fs.unlinkSync(photoFile.path);
      res.status(400).json({
        success: false,
        message: 'User already checked out for the day'
      });
    }

  } catch (error: any) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Get all entries for today
    const todayEntries:any[] = await EntrySchema.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    // Count login entries for today
    const checkIn = todayEntries.filter((entry) => entry.entryType === 'login').length;
    
    // Count logout entries for today
    const checkOut = todayEntries.filter(entry => entry.entryType === 'logout').length;
    
    // Count unique emails for today
    const uniqueEmails = [...new Set(todayEntries.map(entry => entry.email))];
    const totalAttendee = uniqueEmails.length;

    res.status(200).json({
      success: true,
      data: {
        checkIn,      // Total login entries today
        checkOut,     // Total logout entries today  
        totalAttendee // Unique emails today
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};



export const getAttendanceHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Get all entries for today
    const todayEntries = await EntrySchema.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).sort({ createdAt: -1 });

    // Group entries by email
    const groupedEntries: { [key: string]: any } = {};
    
    todayEntries.forEach((entry: any) => {
      const email = entry.email;
      
      if (!groupedEntries[email]) {
        groupedEntries[email] = {
          email: entry.email,
          name: entry.name,
          checkIn: null,
          checkout: null
        };
      }

      if (entry.entryType === 'login') {
        groupedEntries[email].checkIn = {
          time: entry.createdAt,
          photo: `${req.protocol}://${req.get('host')}${entry.photo}`
        };
      } else if (entry.entryType === 'logout') {
        groupedEntries[email].checkout = {
          time: entry.createdAt, // createdAt is the logout time
          photo: `${req.protocol}://${req.get('host')}${entry.photo}`
        };
      }
    });

    // Convert to array
    const history = Object.values(groupedEntries);

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};