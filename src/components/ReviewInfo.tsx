import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApplication } from '../hooks/useApplication';
import useOptions from '../hooks/useOptions';

const ReviewInfo = () => {
	const { t } = useTranslation();
	const { applicationData } = useApplication();
	const genderOptions = useOptions('genderOptions');
	const maritalStatusOptions = useOptions('maritalStatusOptions');
	const employmentStatusOptions = useOptions('employmentStatusOptions');
	const housingStatusOptions = useOptions('housingStatusOptions');

	const translatedValue = (key: string, value: string | number) => {
		switch (key) {
			case 'gender':
				return (
					genderOptions.find((option) => option.value === value)?.label || value
				);
			case 'maritalStatus':
				return (
					maritalStatusOptions.find((option) => option.value === value)
						?.label || value
				);
			case 'employmentStatus':
				return (
					employmentStatusOptions.find((option) => option.value === value)
						?.label || value
				);
			case 'housingStatus':
				return (
					housingStatusOptions.find((option) => option.value === value)
						?.label || value
				);
			default:
				return value;
		}
	};

	return (
		<Box>
			<Typography variant='h5' sx={{ mb: 2 }}>
				{t('reviewSubmit.title')}
			</Typography>
			<Typography variant='body1' sx={{ mb: 1 }}>
				{t('reviewSubmit.instructions')}
			</Typography>
			<Box sx={{ mt: 2 }}>
				{Object.entries(applicationData).map(([key, value]) => (
					<>
						<Typography variant='h6' sx={{ mb: 1 }}>
							{t(`${key}.title`)}
						</Typography>
						<Table sx={{ width: '100%' }}>
							<TableBody>
								{Object.entries(value).map(([subKey, subValue]) => (
									<TableRow key={`${key}-${subKey}`}>
										<TableCell sx={{ fontWeight: 'bold' }}>
											{t(`${key}.fields.${subKey}`)}
										</TableCell>
										<TableCell>{translatedValue(subKey, subValue)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</>
				))}
			</Box>
		</Box>
	);
};

export default ReviewInfo;
