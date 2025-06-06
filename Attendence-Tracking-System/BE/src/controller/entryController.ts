import { Request, Response } from 'express';
import { EntrySchema } from '../model/entrySchema';
import { statusMessage } from './utils';

export const entryRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    const photoFile = req.file as Express.Multer.File;
    
   
    const photoUrl = `data:${photoFile.mimetype};base64,${photoFile.buffer.toString('base64')}`;

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
        photo: photoUrl, 
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
        photo: photoUrl, 
        entryType: 'logout'
      });
      
      await logoutEntry.save();
      
      res.status(201).json({
        success: true,
        message: 'Logout recorded',
        data: { entryType: 'logout', photo: photoUrl }
      });
      
    } else {
      res.status(400).json({
        success: false,
        message: 'User already checked out for the day'
      });
    }

  } catch (error: any) {    
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

    
    const checkIn = todayEntries.filter((entry) => entry.entryType === 'login').length;
    
    
    const checkOut = todayEntries.filter(entry => entry.entryType === 'logout').length;
    
    
    const uniqueEmails = [...new Set(todayEntries.map(entry => entry.email))];
    const totalAttendee = uniqueEmails.length;

    res.status(200).json({
      success: true,
      data: {
        checkIn,     
        checkOut,    
        totalAttendee
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

    const todayEntries = await EntrySchema.find({
      createdAt: { $gte: startOfDay, $lt: endOfDay }
    }).sort({ createdAt: -1 });

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
          photo: entry.photo // This is now base64 - no URL construction needed
        };
      } else if (entry.entryType === 'logout') {
        groupedEntries[email].checkout = {
          time: entry.createdAt,
          photo: entry.photo // This is now base64 - no URL construction needed
        };
      }
    });

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
