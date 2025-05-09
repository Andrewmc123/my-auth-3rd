const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, ReviewImage, Booking, Review, Spot, SpotImage } = require('../../db/models');
const {Op} = require('sequelize')

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const userId = req.user.id;

    try {
        const spotImage = await SpotImage.findOne({
            where: { id: imageId },
            include: {
                model: Spot,
                attributes: ['ownerId'] 
            }
        });

        if (!spotImage) {
            return res.status(404).json({
                message: "Spot Image couldn't be found"
            });
        }

        if (spotImage.Spot.ownerId !== userId) {
            return res.status(403).json({
                message: 'Forbidden: You do not have permission to delete this image'
            });
        }

        await spotImage.destroy();

        res.status(200).json({
            message: "Successfully deleted"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;
